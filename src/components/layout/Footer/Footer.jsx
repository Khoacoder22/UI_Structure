export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 py-5 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} NOVA Admin. All rights reserved.
    </footer>
  )
}