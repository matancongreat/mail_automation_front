import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Terms = () => {
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
            <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-foreground leading-relaxed">
                By accessing and using Congreat, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do 
                not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
              <p className="text-foreground leading-relaxed">
                Congreat is an artificial intelligence-powered application that analyzes your email 
                content and automatically generates actionable tasks. Our service helps you stay 
                organized and productive by converting important emails into manageable tasks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Security</h3>
                  <p className="text-foreground leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials 
                    and for all activities that occur under your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Appropriate Use</h3>
                  <p className="text-foreground leading-relaxed">
                    You agree to use our service only for lawful purposes and in accordance with these 
                    Terms of Use. You must not use the service in any way that could damage, disable, 
                    or impair the service.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Content Accuracy</h3>
                  <p className="text-foreground leading-relaxed">
                    You acknowledge that AI-generated tasks may not always be perfectly accurate and 
                    should review all generated content before acting upon it.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Email Access and Processing</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>You grant us permission to access your email for task generation purposes</li>
                <li>We process email content using AI technology to create relevant tasks</li>
                <li>Email access can be revoked at any time through your account settings</li>
                <li>We do not permanently store your email content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-foreground leading-relaxed">
                All content, features, and functionality of Congreat are owned by us and are protected 
                by international copyright, trademark, and other intellectual property laws. You may 
                not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
              <p className="text-foreground leading-relaxed">
                We strive to maintain high service availability but do not guarantee uninterrupted 
                access. We reserve the right to modify, suspend, or discontinue the service at any 
                time with reasonable notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-foreground leading-relaxed">
                Congreat shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, or 
                other intangible losses resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="text-foreground leading-relaxed">
                Either party may terminate this agreement at any time. Upon termination, your right 
                to use the service will cease immediately, and we will delete your account data in 
                accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="text-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or through the application. Continued use of the service 
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about these Terms of Use, please contact us at{" "}
                <a href="mailto:legal@congreat.com" className="text-primary hover:underline">
                  legal@congreat.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;