import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-square w-full bg-muted animate-pulse" />
          <CardContent className="p-4">
            <div className="h-4 w-2/3 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

