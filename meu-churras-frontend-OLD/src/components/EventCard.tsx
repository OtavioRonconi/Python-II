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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <Link href={`/eventos/${evento.id}`}>
        <div className="relative w-full h-48">
          {/* Usaremos uma imagem padrão por enquanto */}
          <Image 
            src="/img/bg-img/foto_receita.png" 
            alt={evento.nome} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
        <div className="p-4 bg-white">
          <h5 className="text-lg font-bold text-gray-800 group-hover:text-red-500 transition-colors duration-300">
            {evento.nome}
          </h5>
        </div>
      </Link>
    </div>
  );
}