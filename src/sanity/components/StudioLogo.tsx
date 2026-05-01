/**
 * Branded logo shown in the Studio top-left, replacing the default Sanity mark.
 * Uses the same wordmark as the public Navbar so admins know they're in the
 * right place. `next/image` isn't available inside the Studio SPA bundle, so a
 * plain <img> is required here.
 */
export function StudioLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://res.cloudinary.com/dkvpqgkdr/image/upload/v1764097888/For_Website_Light_BG-01_janmev.png"
      alt="Zoe Christian Assembly"
      style={{
        height: "32px",
        width: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

export default StudioLogo;
