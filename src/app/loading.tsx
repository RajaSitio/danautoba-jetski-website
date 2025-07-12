
import { Loader2 } from 'lucide-react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // This will be shown while the page content is loading.
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-background text-foreground">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
      <p className="text-xl text-muted-foreground">Memuat halaman...</p>
    </div>
  );
}
