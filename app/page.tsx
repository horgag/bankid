// app/page.tsx
import DeepLinkButton from "../components/DeepLinkButton";

export default function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <DeepLinkButton />
    </div>
  );
}