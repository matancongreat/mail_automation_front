import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-foreground leading-relaxed">
                At Congreat, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our email-to-task AI application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Email Data</h3>
                  <p className="text-foreground leading-relaxed">
                    We access your email content solely to analyze and convert emails into actionable tasks. 
                    We do not store email content permanently and process it only for task generation purposes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Information</h3>
                  <p className="text-foreground leading-relaxed">
                    We collect your email address and basic profile information to provide our services 
                    and manage your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Usage Data</h3>
                  <p className="text-foreground leading-relaxed">
                    We collect information about how you use our application to improve our services 
                    and user experience.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>Analyze email content to generate relevant tasks</li>
                <li>Provide and maintain our services</li>
                <li>Improve our AI algorithms and user experience</li>
                <li>Communicate with you about service updates</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                All email data is encrypted in transit and processed in secure environments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="text-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to provide our services 
                and fulfill the purposes outlined in this policy. Email content is processed temporarily 
                and not stored permanently on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and data</li>
                <li>Withdraw consent for data processing</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@congreat.com" className="text-primary hover:underline">
                  privacy@congreat.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;