// src/components/EventCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface Evento {
  id: number;
  nome: string;
}

interface EventCardProps {
  evento: Evento;
}

export default function EventCard({ evento }: EventCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-lg hover:shadow-red-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-2">
      <Link href={`/eventos/${evento.id}`} className="block">
        <div className="relative w-full h-56">
          <Image 
            src="/img/bg-img/foto_receita.png" 
            alt={evento.nome} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
        <div className="p-5">
          <h5 className="text-xl font-bold text-slate-100 truncate">
            {evento.nome}
          </h5>
        </div>
      </Link>
    </div>
  );
}