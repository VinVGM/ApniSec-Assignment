import Link from "next/link"
import { Shield, Eye, Cloud, Lock, Users, FileCheck, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "ApniSec - Elite Cybersecurity Solutions",
  description: "Virtual CISO, VAPT, and Compliance services for the modern enterprise.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary animate-pulse" />
                <span className="font-mono text-xl font-bold tracking-tighter text-white">
                    APNI<span className="text-primary">SEC</span>
                </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                <Link href="#services" className="hover:text-primary transition-colors">SERVICES</Link>
                <Link href="#about" className="hover:text-primary transition-colors">ABOUT</Link>
                <Link href="#compliance" className="hover:text-primary transition-colors">COMPLIANCE</Link>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/login">
                    <Button className="bg-primary text-white hover:bg-primary/90 font-bold tracking-wide">
                        LOGIN
                    </Button>
                </Link>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        
        <div className="container relative mx-auto px-6 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                SYSTEMS OPERATIONAL
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 tracking-tight leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Elite Cybersecurity <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">for the Modern Enterprise</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                Build a DevSecOps culture with your own in-house security team. 
                Get real-time alerts, comprehensive assessments, and guaranteed compliance.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 h-12 px-8 text-base font-bold">
                    GET SECURED
                </Button>
                <Link href="/dashboard">
                    <Button variant="outline" size="lg" className="border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-white/20 h-12 px-8 text-base">
                        VIEW LIVE DEMO
                    </Button>
                </Link>
            </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-zinc-950/[0.3] relative border-t border-white/5">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Arsenal</h2>
                <p className="text-gray-400 max-w-xl mx-auto">Comprehensive security solutions tailored for your infrastructure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <ServiceCard 
                    icon={Users}
                    title="Virtual CISO" 
                    desc="Build DevSecOps culture with your own InHouse Security Team. Strategic leadership on demand."
                    
                />
                 {/* Card 2 */}
                 <ServiceCard 
                    icon={Eye}
                    title="Dark Eye Watcher" 
                    desc="Get real-time alerts on dark web leaks to protect your brand's reputation and user data."
                />
                 {/* Card 3 */}
                 <ServiceCard 
                    icon={Cloud}
                    title="Cloud Security" 
                    desc="AWS, Azure, GCP & Private Cloud Monitoring. Full visibility into your cloud infrastructure."
                />
                 {/* Card 4 */}
                 <ServiceCard 
                    icon={Shield}
                    title="VAPT" 
                    desc="Comprehensive Security Assessments for Web, Mobile, API, and Network with Retests and Reports."
                />
                 {/* Card 5 */}
                 <ServiceCard 
                    icon={Lock}
                    title="Red Team Assessment" 
                    desc="Evaluate overall weak links in your systems, processes and network with adversarial simulations."
                />
                 {/* Card 6 */}
                 <ServiceCard 
                    icon={FileCheck}
                    title="Validate Compliance" 
                    desc="ISO 27001, SOC2, GDPR, HIPAA, PCI DSS. Pass your audits with our expert guidance."
                />
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="font-mono text-lg font-bold text-gray-300">
                    APNI<span className="text-gray-500">SEC</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ApniSec Inc. All rights reserved.</p>
              <div className="flex gap-6 text-sm text-gray-500">
                  <Link href="#" className="hover:text-primary">Privacy</Link>
                  <Link href="#" className="hover:text-primary">Terms</Link>
                  <Link href="#" className="hover:text-primary">Contact</Link>
              </div>
          </div>
      </footer>
    </div>
  )
}

function ServiceCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="group relative p-8 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_faq(var(--primary)/0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative">
                <div className="h-12 w-12 rounded-lg bg-black border border-green-500/50 flex items-center justify-center mb-6 group-hover:bg-green-500/20 group-hover:border-green-500 transition-colors shadow-[0_0_10px_-3px_rgba(34,197,94,0.3)]">
                    <Icon className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{title}</h3>
                <p className="text-white leading-relaxed text-sm font-medium">
                    {desc}
                </p>
                
                <div className="mt-6 flex items-center text-green-400 text-xs font-bold tracking-widest uppercase opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    Show Details <ArrowRight className="ml-2 h-3 w-3" />
                </div>
            </div>
        </div>
    )
}
