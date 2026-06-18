import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <main className="about-main">
      <div className="about-block">
        <div className="list-intro">
          <h1 className="list-heading">let&apos;s talk.</h1>
          <p className="list-sub">
            Building something that matters? Reach me directly at{" "}
            <a href="mailto:sheryahmedme1@gmail.com" className="item-link">
              sheryahmedme1@gmail.com
            </a>
            , or request a quote below.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
