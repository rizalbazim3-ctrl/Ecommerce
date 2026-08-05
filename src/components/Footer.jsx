import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = ["Home", "Books", "Best sellers"];
  const categories = ["Fiction", "Romance", "Mystery", "Self-help"];
  const customerService = ["My account", "My orders", "Wishlist"];

  return (
    <footer
      style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
      className="w-full bg-[#241a12] text-[#e7dcc4] border-t-4 border-double border-[#c9a15c]"
    >
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2 pr-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={24} className="text-[#c9a15c]" strokeWidth={1.5} />
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl tracking-[0.1em] font-bold text-[#f3ead9]"
            >
              Wildink
            </span>
          </div>
          <p className="text-[15px] leading-relaxed text-[#c9bda3] max-w-xs">
            Your one-stop bookstore for timeless classics, fresh new
            releases, and everything in between.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[15px] tracking-[0.08em] uppercase text-[#c9a15c] mb-4 font-semibold">
            Quick links
          </h4>
          <ul className="space-y-2.5 text-[15px]">
            {quickLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[#e7dcc4] hover:text-[#c9a15c] transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-[15px] tracking-[0.08em] uppercase text-[#c9a15c] mb-4 font-semibold">
            Categories
          </h4>
          <ul className="space-y-2.5 text-[15px]">
            {categories.map((cat) => (
              <li key={cat}>
                <a
                  href="#"
                  className="text-[#e7dcc4] hover:text-[#c9a15c] transition-colors"
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer service + Contact */}
        <div>
          <h4 className="text-[15px] tracking-[0.08em] uppercase text-[#c9a15c] mb-4 font-semibold">
            Customer service
          </h4>
          <ul className="space-y-2.5 text-[15px] mb-6">
            {customerService.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[#e7dcc4] hover:text-[#c9a15c] transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <h4 className="text-[15px] tracking-[0.08em] uppercase text-[#c9a15c] mb-4 font-semibold">
            Contact us
          </h4>
          <ul className="space-y-2.5 text-[14px] text-[#c9bda3]">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-[#c9a15c] shrink-0" strokeWidth={1.5} />
              support@wildink.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-[#c9a15c] shrink-0" strokeWidth={1.5} />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-[#c9a15c] shrink-0" strokeWidth={1.5} />
              Kerala, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#c9a15c]/25">
        <div className="max-w-7xl mx-auto px-6 h-14 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-[#c9bda3]">
          <span>© 2026 Wildink. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#c9a15c] transition-colors">
              Privacy policy
            </a>
            <span className="text-[#c9a15c]/40">|</span>
            <a href="#" className="hover:text-[#c9a15c] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}