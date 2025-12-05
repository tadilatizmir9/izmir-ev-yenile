import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, Eye, Clock, Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    unreadContacts: 0,
    totalPosts: 0,
    publishedPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");

        const { count: totalContacts } = await supabase
          .from("contact_submissions")
          .select("*", { count: "exact", head: true });

        const { count: unreadContacts } = await supabase
          .from("contact_submissions")
          .select("*", { count: "exact", head: true })
          .eq("is_read", false);

        const { count: totalPosts } = await supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true });

        const { count: publishedPosts } = await supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true })
          .eq("published", true);

        setStats({
          totalContacts: totalContacts || 0,
          unreadContacts: unreadContacts || 0,
          totalPosts: totalPosts || 0,
          publishedPosts: publishedPosts || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Toplam İletişim",
      value: stats.totalContacts,
      description: "Gelen form başvuruları",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Okunmamış",
      value: stats.unreadContacts,
      description: "Bekleyen başvurular",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Toplam Yazı",
      value: stats.totalPosts,
      description: "Blog yazıları",
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Yayında",
      value: stats.publishedPosts,
      description: "Yayınlanmış yazılar",
      icon: Eye,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Yönetim paneli özeti</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-display">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hoş Geldiniz</CardTitle>
          <CardDescription>
            Admin panelinden iletişim formlarını ve blog yazılarını yönetebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Sol menüden iletişim formlarını görüntüleyin
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Blog yazılarını ekleyin, düzenleyin veya silin
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
