import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-orange-strong">
        ERROR 404
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium text-ink sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
        Esta sección del manual no existe o se movió. Revisa el menú para
        encontrar el módulo que buscas.
      </p>
      <Button href="/" variant="primary" className="mt-8">
        Volver al inicio
      </Button>
    </div>
  );
}
