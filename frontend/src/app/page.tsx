import Image from "next/image";

type Project = {
  id: number;
  name: string;
  architect: string;
  votes: number;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: 'Modern Villa',
    architect: 'Zeynep Yılmaz',
    votes: 12,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Eco Office',
    architect: 'Ali Demir',
    votes: 8,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Urban Loft',
    architect: 'Elif Kaya',
    votes: 20,
    image: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?auto=format&fit=crop&w=400&q=80',
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto w-full bg-white text-[#2D3748] dark:bg-[#181A20] dark:text-[#E2E8F0] transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-8 text-[#2D3748] dark:text-[#E2E8F0]">ArchiDAO Projeleri</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white text-[#2D3748] dark:bg-[#23272F] dark:text-[#E2E8F0] rounded-lg shadow p-4 flex flex-col items-center transition-colors duration-500">
            <img src={project.image} alt={project.name} className="w-full h-40 object-cover rounded mb-4" />
            <div className="font-semibold text-lg mb-1 text-[#2D3748] dark:text-[#E2E8F0]">{project.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">Mimar: {project.architect}</div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#4299E1] font-bold">{project.votes}</span>
              <span className="text-gray-500 dark:text-gray-300">oy</span>
            </div>
            <button className="bg-[#4299E1] text-white px-4 py-2 rounded w-full">Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
}
