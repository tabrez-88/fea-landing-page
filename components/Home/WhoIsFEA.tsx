import AudienceFEA from '@/public/assets/audience-fea.png'
import { CircleCheck } from 'lucide-react'
import Image from 'next/image'

export default function WhoIsFEA() {
  return (
    < section className="w-full px-6 py-20 md:px-19.5 lg:px-37.5 transition-all duration-300" >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative w-full h-103">
          <Image
            src={AudienceFEA}
            alt="FEA Audience Illustration"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-11">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold tracking-[0.2em] uppercase">
              Audience
            </span>
            <h2 className="text-3xl md:text-[40px] font-light">
              Who Is <span className="font-bold">FEA</span> For?
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-2 w-full">
              <CircleCheck fill='black' color='white' className='size-5' size={20} />
              <div>
                <h3 className="font-bold text-sm">Creators & Studios</h3>
                <p className="text-[#808080]">
                  Bring structured entertainment projects to a curated
                  marketplace designed for long-term value.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <svg
                className="w-5 h-5 mt-0.5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-bold text-sm">Supporters</h3>
                <p className="mt-1 text-sm opacity-70">
                  Access exclusive releases, premiere invitations, and
                  priority participation opportunities.
                </p>
              </div>
            </div>

            {/* Verified Participants */}
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 mt-0.5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-bold text-sm">
                  Verified Participants
                </h3>
                <p className="mt-1 text-sm opacity-70">
                  Explore structured participation opportunities aligned
                  with project performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}
