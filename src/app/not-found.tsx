
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react'; // Atau ikon lain yang sesuai

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-background text-foreground text-center px-4">
      <AlertTriangle className="h-24 w-24 text-primary mb-8" />
      <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
        Oops! Halaman Tidak Ditemukan
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Maaf, halaman yang Anda cari sepertinya tersesat di luasnya Danau Toba.
        Mungkin sudah kembali ke dermaga?
      </p>
      <Button asChild className="btn-gold text-lg px-8 py-6">
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
