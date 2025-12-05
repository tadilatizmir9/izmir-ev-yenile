import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Check, Phone, MapPin, Wrench, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  district: string | null;
  renovation_type: string | null;
  details: string | null;
  is_read: boolean | null;
  created_at: string;
}

const AdminContact = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Hata",
        description: "İletişim formları yüklenemedi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase
        .from("contact_submissions")
        .update({ is_read: true })
        .eq("id", id);

      if (error) throw error;

      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, is_read: true } : s)));

      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, is_read: true });
      }

      toast({ title: "Başarılı", description: "Okundu olarak işaretlendi." });
    } catch (error) {
      console.error("Error marking as read:", error);
      toast({ title: "Hata", description: "İşlem başarısız.", variant: "destructive" });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRenovationTypeLabel = (type: string | null) => {
    const types: Record<string, string> = {
      banyo: "Banyo Tadilat",
      mutfak: "Mutfak Tadilat",
      komple: "Komple Ev Tadilat",
      diger: "Diğer",
    };
    return type ? types[type] || type : "-";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-16" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">İletişim Formları</h1>
        <p className="text-muted-foreground mt-1">Gelen başvuruları görüntüleyin ve yönetin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Başvurular</CardTitle>
          <CardDescription>
            Toplam {submissions.length} başvuru, {submissions.filter((s) => !s.is_read).length}{" "}
            okunmamış
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Henüz başvuru bulunmamaktadır.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Durum</TableHead>
                  <TableHead>Ad Soyad</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Tadilat Türü</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <Badge variant={submission.is_read ? "secondary" : "default"}>
                        {submission.is_read ? "Okundu" : "Yeni"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.phone}</TableCell>
                    <TableCell>{getRenovationTypeLabel(submission.renovation_type)}</TableCell>
                    <TableCell>{formatDate(submission.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {!submission.is_read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(submission.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Başvuru Detayları</DialogTitle>
            <DialogDescription>
              {selectedSubmission && formatDate(selectedSubmission.created_at)}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <Badge variant={selectedSubmission.is_read ? "secondary" : "default"}>
                {selectedSubmission.is_read ? "Okundu" : "Yeni"}
              </Badge>

              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ad Soyad & Telefon</p>
                    <p className="font-medium">{selectedSubmission.name}</p>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="text-primary hover:underline"
                    >
                      {selectedSubmission.phone}
                    </a>
                  </div>
                </div>

                {selectedSubmission.district && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">İlçe</p>
                      <p className="font-medium">{selectedSubmission.district}</p>
                    </div>
                  </div>
                )}

                {selectedSubmission.renovation_type && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Wrench className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tadilat Türü</p>
                      <p className="font-medium">
                        {getRenovationTypeLabel(selectedSubmission.renovation_type)}
                      </p>
                    </div>
                  </div>
                )}

                {selectedSubmission.details && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Detaylar</p>
                      <p className="font-medium whitespace-pre-wrap">
                        {selectedSubmission.details}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {!selectedSubmission.is_read && (
                <Button className="w-full" onClick={() => markAsRead(selectedSubmission.id)}>
                  <Check className="h-4 w-4 mr-2" />
                  Okundu Olarak İşaretle
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContact;
