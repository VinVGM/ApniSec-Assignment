import Link from "next/link";
import {
  Shield,
  Eye,
  Cloud,
  Lock,
  Users,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/ui/retro-grid";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { VelocityScroll } from "@/components/ui/velocity-scroll";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { MagicCard } from "@/components/ui/magic-card";
import { Ripple } from "@/components/ui/ripple";
import NumberTicker from "@/components/ui/number-ticker";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import { TracingBeam } from "@/components/ui/tracing-beam";

export const metadata = {
  title: "ApniSec - Elite Cybersecurity Solutions",
  description:
    "Virtual CISO, VAPT, and Compliance services for the modern enterprise.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden always-dark">
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
            <Link
              href="#services"
              className="hover:text-primary transition-colors"
            >
              SERVICES
            </Link>
            <Link href="#about" className="hover:text-primary transition-colors">
              ABOUT
            </Link>
            <Link
              href="#compliance"
              className="hover:text-primary transition-colors"
            >
              COMPLIANCE
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-primary text-black hover:bg-primary/90 font-bold tracking-wide">
                LOGIN
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        <RetroGrid className="z-0" />
        
        <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl flex flex-col items-center">
             {/* <div className="mb-8 w-fit">
                <NeonGradientCard className="items-center justify-center p-0.5" borderSize={1} borderRadius={30}>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-black rounded-[28px]">
                        <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs font-mono font-bold text-white">SYSTEMS OPERATIONAL</span>
                    </div>
                </NeonGradientCard>
            </div> */}

            <div className="mb-6 w-full">
                <VelocityScroll 
                  text="ELITE CYBERSECURITY // DEVSECOPS // VAPT //" 
                  default_velocity={3}
                  className="text-primary/10 font-black text-6xl md:text-9xl tracking-tighter"
                />
            </div>

          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 tracking-tight leading-[1.1] mb-6">
            Elite Cybersecurity <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              for the Modern Enterprise
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Build a DevSecOps culture with your own in-house security team. Get
            real-time alerts, comprehensive assessments, and guaranteed
            compliance.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="#contact">
                <Button 
                variant="outline"
                size="lg"
                className="border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-white/20 h-[52px] px-8 text-base rounded-full"
                >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    GET SECURED
                    </span>
                </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-white/20 h-[52px] px-8 text-base rounded-full"
              >
                VIEW LIVE DEMO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <TracingBeam className="px-6">
        <div className="max-w-4xl mx-auto antialiased pt-40 relative">
            
            {/* Services Grid */}
            <section id="services" className="mb-40">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Our Arsenal
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                    Comprehensive security solutions tailored for your infrastructure.
                    </p>
                </div>

                <BentoGrid className="max-w-6xl mx-auto">
                    {services.map((item, i) => (
                        <MagicCard 
                            key={i} 
                            className={item.className + " p-6 flex flex-col justify-between"}
                            gradientColor="rgba(34, 197, 94, 0.2)"
                        >
                            <div className="relative z-20 ">
                                <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 relative overflow-hidden group-hover:border-primary/50 transition-colors">
                                    <Ripple className="opacity-0 group-hover:opacity-100 transition-opacity" mainCircleSize={20} numCircles={4} />
                                    <item.icon className="h-6 w-6 text-primary z-10" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                                {item.desc}
                                </p>
                            </div>
                            {item.stats && (
                                <div className="mt-auto border-t border-white/5 pt-4 ">
                                    <p className="text-xs text-primary font-mono mb-1">{item.statsLabel}</p>
                                    <div className="text-xl font-bold text-white flexitems-end gap-1">
                                        <NumberTicker value={item.statsValue || 0} />
                                        <span>{item.statsSuffix}</span>
                                    </div>
                                </div>
                            )}
                        </MagicCard>
                    ))}
                </BentoGrid>
            </section>

            {/* Live Feed Section */}
            <section className="mb-40">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Real-Time <span className="text-primary">Intelligence</span>
                        </h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Stay ahead of threats with our active monitoring systems. We track vulnerabilities, unauthorized access attempts, and system health in real-time.
                        </p>
                         <ul className="space-y-4">
                            {['24/7 Threat Monitoring', 'Automated Patch Management', 'Instant Incident Response'].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                                        <ArrowRight className="h-3 w-3 text-primary" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-600 rounded-xl blur opacity-20"></div>
                        <Terminal className="min-h-[300px]">
                            <TypingAnimation className="text-emerald-500 font-bold block mb-2">
                                &gt; INITIALIZING SECURITY PROTOCOLS...
                            </TypingAnimation>
                            <AnimatedSpan delay={1500} className="text-green-500">
                                <span>✔ [SUCCESS] Firewall Active</span>
                            </AnimatedSpan>
                            <AnimatedSpan delay={2000} className="text-green-500">
                                <span>✔ [SUCCESS] VAPT Module Loaded</span>
                            </AnimatedSpan>
                            <AnimatedSpan delay={2500} className="text-green-500">
                                <span>✔ [SUCCESS] Real-time Monitoring On</span>
                            </AnimatedSpan>
                            <AnimatedSpan delay={3000} className="text-blue-500">
                                <span>ℹ [INFO] Scanning port 443...</span>
                            </AnimatedSpan>
                            <AnimatedSpan delay={3500} className="text-yellow-500">
                                <span>⚠ [WARN] Unauthorized IP 192.168.x.x Blocked</span>
                            </AnimatedSpan>
                             <AnimatedSpan delay={4500} className="text-green-500">
                                <span>✔ [SECURE] System Integrity Verified.</span>
                            </AnimatedSpan>
                             <TypingAnimation delay={5000} className="text-emerald-500 font-bold block mt-4">
                                &gt; WAITING FOR COMMAND...
                            </TypingAnimation>
                        </Terminal>
                    </div>
                </div>
            </section>

            {/* Compliance Section */}
            <section id="compliance" className="mb-20">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Compliance Ready</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        We ensure your infrastructure meets global security standards.
                    </p>
                </div>
                
                <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-black/50 md:shadow-xl border border-white/10">
                    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-white/30 bg-clip-text text-center text-5xl md:text-8xl font-semibold leading-none text-transparent">
                        Global Standards
                    </span>

                     {/* Inner Circles */}
                    <OrbitingCircles
                        className="size-[30px] border-none bg-transparent "
                        duration={20}
                        delay={20}
                        radius={80}
                    >
                         <Shield className="h-8 w-8 text-white" />
                    </OrbitingCircles>
                    <OrbitingCircles
                        className="size-[30px] border-none bg-transparent"
                        duration={20}
                        delay={10}
                        radius={80}
                    >
                         <Lock className="h-8 w-8 text-white" />
                    </OrbitingCircles>

                    {/* Outer Circles */}
                     <OrbitingCircles
                        className="size-[50px] border-none bg-transparent"
                        radius={190}
                        duration={20}
                        reverse
                    >
                        <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs font-bold text-white">ISO</div>
                    </OrbitingCircles>
                    <OrbitingCircles
                        className="size-[50px] border-none bg-transparent"
                        radius={190}
                        duration={20}
                        delay={20}
                        reverse
                    >
                         <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs font-bold text-white">SOC2</div>
                    </OrbitingCircles>
                     <OrbitingCircles
                        className="size-[50px] border-none bg-transparent"
                        radius={190}
                        duration={20}
                        delay={20} // Adjusted delay for better spacing? 
                        // Actually let's use standard delay spacing
                        reverse
                    >
                         <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xs font-bold text-white">GDPR</div>
                    </OrbitingCircles>

                </div>
            </section>
        </div>
      </TracingBeam>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black relative z-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-400" />
            <span className="font-mono text-lg font-bold text-gray-300">
              APNI<span className="text-gray-500">SEC</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ApniSec Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    icon: Users,
    title: "Virtual CISO",
    desc: "Build DevSecOps culture with your own InHouse Security Team. Strategic leadership on demand.",
    className: "md:col-span-2",
    stats: true,
    statsLabel: "EXPERIENCE",
    statsValue: 15,
    statsSuffix: "+ Yrs"
  },
  {
    icon: Eye,
    title: "Dark Eye Watcher",
    desc: "Get real-time alerts on dark web leaks to protect your brand's reputation and user data.",
    className: "md:col-span-1",
    stats: true,
    statsLabel: "THREATS BLOCKED",
    statsValue: 1000000,
    statsSuffix: "+"
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    desc: "AWS, Azure, GCP & Private Cloud Monitoring. Full visibility into your cloud infrastructure.",
    className: "md:col-span-1",
    stats: true,
    statsLabel: "UPTIME",
    statsValue: 99.99,
    statsSuffix: "%"
  },
  {
    icon: Shield,
    title: "VAPT",
    desc: "Comprehensive Security Assessments for Web, Mobile, API, and Network with Retests and Reports.",
    className: "md:col-span-2",
    stats: true,
    statsLabel: "VULNERABILITIES FOUND",
    statsValue: 5000,
    statsSuffix: "+"
  },
  {
    icon: Lock,
    title: "Red Team Assessment",
    desc: "Evaluate overall weak links in your systems, processes and network with adversarial simulations.",
    className: "md:col-span-2",
    stats: false,
  },
  {
    icon: FileCheck,
    title: "Validate Compliance",
    desc: "ISO 27001, SOC2, GDPR, HIPAA, PCI DSS. Pass your audits with our expert guidance.",
    className: "md:col-span-1",
    stats: false,
  },
];
