type LogoProps = {};

export default function Logo({}: LogoProps) {
  return (
    <div className="flex items-center gap-2 select-none">
      <img src="https://cdn.bkappi.com/ProjectsAssets/BkappiGeneral/bkappiIcon.ico" alt="Logo" className="size-8" />
      <span className="font-bold text-xl tracking-tight text-accent-foreground dark:text-accent">Kanban v1</span>
    </div>
  );
}
