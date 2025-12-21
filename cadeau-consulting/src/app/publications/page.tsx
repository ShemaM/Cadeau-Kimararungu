import Link from "next/link";
import { 
  FileText, 
  BookOpen, 
  Loader2, 
  ExternalLink, 
  Calendar,
  Users
} from "lucide-react";

export default function PublicationsPage() {
  
  const researchPapers = [
    {
      title: "Reimagining Diaspora Humanitarianism in the Digital Age",
      subtitle: "Exploring the Near and Far Diaspora Dynamics among Congolese Refugees in Nairobi, Kenya",
      journal: "Fennia - International Journal of Geography",
      role: "Co-authored with Dr. Marie Godin",
      date: "2024",
      link: "https://fennia.journal.fi/article/view/145435/106175",
      description: "Published in the special issue 'Reimagining Humanitarianism'. Edited by Dr. Cindy Horst (PRIO), Dr. Catherine Brun (Centre for Lebanese Studies) and Dr. Hilde Refstie (NTNU)."
    },
    {
      title: "Refugee Children in Kenya",
      subtitle: "The intersectionality of Legal Identity, Health and Education",
      journal: "OECD - UNHCR Datathon 2025",
      role: "Co-authored with Alice Ishimwe",
      date: "2025",
      link: "https://storymaps.arcgis.com/stories/23cd989da01a4d87850950947554a207",
      description: "A data exploration and analysis project showcasing the intersectionality of key welfare indicators for refugee children."
    },
    {
      title: "From Evidence to Policy: Research & Policy Symposium Report",
      subtitle: "Panel: Access to Justice and Legal Identity",
      journal: "Symposium convened by IRC ReBuild, World Bank Group, and IKEA Foundation",
      role: "Contributor / Presenter",
      date: "2024",
      link: null, // No direct link provided in source, keeping layout consistent
      description: "Contributed to the symposium report following the presentation on 'Access to Justice and Legal Identity'."
    }
  ];

  const migrationStories = [
    {
      title: "On the Long Run: The Story of A (Refugee) UltraMarathon Runner",
      subject: "François Msafiri",
      publication: "Samuel Hall Storytelling",
      role: "By Devyani Nighoskar & Kimararungu Cadeau Héritier",
      description: "A narrative piece exploring the resilience and journey of a refugee athlete."
    },
    {
      title: "With One Arm and Endless Resolve",
      subject: "The Story of a Tailor Who Founded a Refugee-Led Initiative for People with Disabilities",
      publication: "Samuel Hall Storytelling (Parts 1 & 2)",
      role: "By Devyani Nighoskar, Kimararungu Cadeau Héritier & Mwara Namelok",
      description: "Documenting the inspiring initiative of a refugee entrepreneur supporting the disabled community."
    }
  ];

  const ongoingProjects = [
    {
      title: "Congolese Diaspora University Students in Kenya",
      focus: "Exploring experience and mobility of students from African countries (Mozambique, Zambia, Malawi, Tanzania, Uganda, Rwanda, Burundi).",
      partners: "British Academy & German Fellowship",
      role: "Co-authoring with Dr. Marie Godin"
    },
    {
      title: "Understanding Digital Work Experiences among Refugees",
      focus: "Mixed methods research (Qualitative & Quantitative) in Nairobi and Kakuma refugee camp.",
      partners: "University of Leicester, University of Oxford, Na’amal, University of Edinburgh",
      role: "Research Consultant"
    },
    {
      title: "Understanding Refugee Experiences in Tech Industry",
      focus: "Fieldwork in Nairobi (April-Aug 2025) and Kakuma (Sept-Oct 2025).",
      partners: "Refugee-Led Research Hub (RLRH) & British Academy",
      role: "Research Consultant with Dr. Marie Godin & Fardosa Salah"
    },
    {
      title: "East African Community Permit: An Alternative to Durable Solutions",
      focus: "Comparative analysis of Global Compact on Refugee (GCR) member countries' laws.",
      partners: "Global Rights Defenders (GRD), UNHCR, Strathmore Law School, ILO, IRC",
      role: "Contributing Researcher"
    }
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-20 bg-white">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16 border-b border-gray-100 pb-10">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
          Publications <span className="text-gray-400">&</span> Research
        </h1>
        <p className="text-xl text-gray-500 font-light max-w-2xl">
          Academic papers, narrative storytelling, and active research projects influencing migration policy.
        </p>
      </div>

      {/* SECTION 1: RESEARCH PAPERS */}
      <section className="max-w-4xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Research Papers</h2>
        </div>

        <div className="grid gap-6">
          {researchPapers.map((paper, index) => (
            <div key={index} className="group relative border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-100 bg-white">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {paper.journal}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-md font-medium text-gray-700">
                    {paper.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {paper.role}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {paper.date}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed max-w-2xl">
                    {paper.description}
                  </p>
                </div>
                {paper.link && (
                  <Link 
                    href={paper.link} 
                    target="_blank"
                    className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mt-2 md:mt-0"
                  >
                    Read Paper <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: MIGRATION STORIES */}
      <section className="max-w-4xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-orange-50 rounded-lg">
            <BookOpen className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Migration Stories</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {migrationStories.map((story, index) => (
            <div key={index} className="flex flex-col h-full border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gray-50/50">
              <div className="mb-4">
                <span className="text-xs font-bold tracking-wider text-orange-600 uppercase">
                  {story.publication}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {story.title}
              </h3>
              <p className="text-sm font-medium text-gray-600 mb-4 italic">
                {story.subject}
              </p>
              <p className="text-gray-600 text-sm mb-6 grow">
                {story.description}
              </p>
              <div className="pt-4 border-t border-gray-200 mt-auto">
                <p className="text-xs text-gray-500">
                  {story.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ON-GOING PROJECTS */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-green-50 rounded-lg">
            <Loader2 className="w-6 h-6 text-green-600 animate-spin-slow" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">On-going Research</h2>
        </div>

        <div className="space-y-4">
          {ongoingProjects.map((project, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-gray-100 hover:border-green-200 bg-white transition-colors">
              <div className="md:w-1/3">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-green-600 font-semibold mt-2 uppercase tracking-wide">
                  Active Project
                </p>
              </div>
              <div className="md:w-2/3 space-y-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {project.focus}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-6 text-xs text-gray-500">
                  <span className="font-medium text-gray-900">
                    Partners: {project.partners}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Role: {project.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}