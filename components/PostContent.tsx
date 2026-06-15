import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ComponentProps } from 'react'

// Renderiza el contenido del artículo escrito en Markdown, con estilos propios
// (negritas, cursiva, títulos, listas, enlaces, citas…).
export default function PostContent({ markdown }: { markdown: string }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-[#44403C] dark:text-[#D6D3D1]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: (p: ComponentProps<'h2'>) => (
            <h2 className="mt-10 mb-3 text-2xl font-black text-[#1C1917] dark:text-[#F5F5F4]" {...p} />
          ),
          h3: (p: ComponentProps<'h3'>) => (
            <h3 className="mt-8 mb-2 text-xl font-bold text-[#1C1917] dark:text-[#F5F5F4]" {...p} />
          ),
          p: (p: ComponentProps<'p'>) => <p className="leading-relaxed" {...p} />,
          strong: (p: ComponentProps<'strong'>) => (
            <strong className="font-bold text-[#1C1917] dark:text-[#F5F5F4]" {...p} />
          ),
          em: (p: ComponentProps<'em'>) => <em className="italic" {...p} />,
          ul: (p: ComponentProps<'ul'>) => <ul className="list-disc space-y-1 pl-6" {...p} />,
          ol: (p: ComponentProps<'ol'>) => <ol className="list-decimal space-y-1 pl-6" {...p} />,
          a: (p: ComponentProps<'a'>) => (
            <a className="font-semibold text-[#BF2638] underline underline-offset-2 hover:text-[#A01E30]" {...p} />
          ),
          blockquote: (p: ComponentProps<'blockquote'>) => (
            <blockquote className="border-l-4 border-[#BF2638] pl-5 italic text-[#1C1917] dark:text-[#F5F5F4]" {...p} />
          ),
          hr: () => <hr className="border-stone-200 dark:border-white/10" />,
          code: (p: ComponentProps<'code'>) => (
            <code className="rounded bg-stone-100 px-1.5 py-0.5 text-base dark:bg-white/10" {...p} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
