export function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm md:text-base">
      <p>
        Desenvolvido por{" "}
        <span className="hover:text-black duration-300">@Quinto Code</span> -{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
