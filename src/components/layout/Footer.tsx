interface FooterProps {
  attributionHTML?: string;
}

export const Footer = ({ attributionHTML }: FooterProps) => {
  return (
    <footer className="flex flex-col md:flex-row gap-2 items-center justify-center w-full bg-neutral-800 py-4 border-t border-red-600">
      <p className="text-base font-normal text-neutral-50">
        Por{' '}
        <a
          href="https://flaviosantos.dev/"
          rel="noreferrer"
          target="_blank"
          className="text-base font-normal text-neutral-50 hover:text-amber-500 transition-colors"
        >
          Flávio Santos
        </a>
        {attributionHTML && ' |'}
      </p>

      {attributionHTML && (
        <p
          className="text-base font-normal text-neutral-50 hover:text-amber-500 transition-colors"
          dangerouslySetInnerHTML={{ __html: attributionHTML }}
        />
      )}
    </footer>
  );
};
