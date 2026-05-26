type PageHeaderProps = {
  badge?: string;
  title: string;
  description: string;
};

export default function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10">
      {badge && (
        <span className="inline-block rounded-full border border-[#3b9eff]/25 bg-[#3b9eff]/10 px-3 py-1 text-xs font-medium text-[#7ec8ff]">
          {badge}
        </span>
      )}
      <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#8b95a8]">{description}</p>
    </div>
  );
}
