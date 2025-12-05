-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles (only admins can view)
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Blog posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    meta_title TEXT,
    meta_description TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage all posts" ON public.blog_posts
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Contact form submissions table
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    district TEXT,
    renovation_type TEXT,
    details TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit contact form
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
FOR INSERT WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view submissions" ON public.contact_submissions
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update submissions
CREATE POLICY "Admins can update submissions" ON public.contact_submissions
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies
CREATE POLICY "Anyone can view blog images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog images" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog images" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));