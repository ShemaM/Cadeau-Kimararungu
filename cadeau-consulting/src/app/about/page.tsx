import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        
        {/* Left Column: Image */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-full">
          <div className="aspect-3/4 overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
            {/* Replace '/images/profile.jpg' with the actual path to his photo */}
            <Image
              src="/images/profile.png" 
              alt="Cadeau Héritier - Research Consultant"
              width={600}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          {/* Decorative element (optional) */}
          <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl border-2 border-primary/20 bg-transparent" />
        </div>

        {/* Right Column: Bio Content */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              About Cadeau Héritier
            </h1>
            <h2 className="text-xl font-medium text-gray-700">
              Multilingual Research Consultant Specializing in Forced Migration, Policy & Community Engagement
            </h2>
          </div>

          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              My work focuses on migration governance by conducting research that
              reflects the lived experiences and priorities of displaced
              communities and transforming forced migration research into policy
              impact.
            </p>

            <p>
              Over the years, I had the privilege of working with esteemed
              humanitarian organizations such as HIAS, the Refugee Consortium of
              Kenya (RCK), RefugePoint, HAART Kenya, and Pamoja Trust on issues
              ranging from refugee protection to peacebuilding and conflict
              resolution to community engagement with host communities.
            </p>

            <p>
              In addition, I have been deeply involved in forced migration
              research in Nairobi, contributing as a Research Assistant (RA) to
              various research projects funded by the University of Oxford&apos;s
              Refugee Studies Center (RSC), British Academy, the University of
              Bergen, Clark University, American University, Samuel Hall,
              Refugee-Led Research Hub, and the German Fellowship.
            </p>

            <p>
              Today, I continue to apply my expertise in migration governance
              and refugee protection at GRD (Global Rights Defenders), where I
              am serving as Policy & Research Advisor.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}