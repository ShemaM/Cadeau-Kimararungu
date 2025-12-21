import Link from "next/link";
import { 
  BookOpen, 
  BarChart3, 
  Users, 
  Languages 
} from "lucide-react"; // Ensure you have lucide-react installed, or use alternatives

export default function ServicesPage() {
  const services = [
    {
      title: "Qualitative Research",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      description: "Comprehensive qualitative methodologies designed to capture nuanced data.",
      items: [
        "Research design",
        "Research data collection",
        "Research analysis",
        "Research report writing",
      ],
    },
    {
      title: "Quantitative Research",
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      description: "Data-driven insights using advanced statistical tools (R & Python).",
      items: [
        "Survey design",
        "Research data collection",
        "Data analysis (R statistical & Python)",
        "Data cleaning & manipulation",
        "Data visualization",
      ],
    },
    {
      title: "Community Engagement",
      icon: <Users className="h-8 w-8 text-orange-600" />,
      description: "Facilitating meaningful dialogue between organizations and communities.",
      items: [
        "Focus Group Discussions (FGD) facilitation",
        "Workshop facilitation",
        "Participants mobilization",
      ],
    },
    {
      title: "Translation Services",
      icon: <Languages className="h-8 w-8 text-purple-600" />,
      description: "Professional translation across multiple regional languages.",
      items: [
        "Kiswahili",
        "Kinyamulenge",
        "Kinyarwanda",
        "Kirundi",
        "Français (French)",
      ],
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
          Services
        </h1>
        <p className="text-lg text-gray-600">
          Specialized consulting in research, policy analysis, and community engagement across the Great Lakes Region and East Africa.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-6 inline-flex items-center justify-center rounded-lg bg-gray-50 p-3 w-fit">
              {service.icon}
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              {service.title}
            </h3>
            <p className="mb-6 text-gray-600">
              {service.description}
            </p>
            <ul className="mt-auto space-y-3">
              {service.items.map((item, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to collaborate?
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you need deep qualitative insights or rigorous quantitative analysis, I am ready to support your research goals.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
        >
          Contact Me
        </Link>
      </div>
    </main>
  );
}