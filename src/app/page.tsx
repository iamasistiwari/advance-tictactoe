/* eslint-disable react/no-unescaped-entities */
import Counter from '@/components/Counting';
import { Users, Gamepad2, Zap, Rss } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RiNextjsLine } from 'react-icons/ri';

export default async function Home() {

  return (
    <div className="min-h-screen scroll-smooth">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="container mx-auto px-4 pb-32 pt-12 lg:pt-20">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="relative">
            <h1 className="bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-[52px] font-bold text-transparent shadow-lg lg:text-6xl">
              Real-time Tic-Tac-Toe
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl text-[17px] lg:text-xl">
            Challenge players worldwide in fast-paced matches. Create the room,
            and share the room to play with friends the real advance tictactoe
            game.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href={`/dashboard`}
              className="rounded-md bg-gradient-to-r from-indigo-700 to-teal-700 px-8 py-1.5 text-lg shadow-sm lg:px-8"
            >
              Play Now
            </Link>
            <Link
              href="#info"
              className="rounded-md border border-neutral-500 px-6 py-1.5 text-lg shadow-sm hover:cursor-pointer"
            >
              Learn Rules
            </Link>
          </div>

          <div className="flex w-full flex-row justify-center space-x-4 pt-10">
            <div className="h-20 rounded-xl p-2 backdrop-blur lg:p-6">
              <div className="flex items-center gap-2 lg:gap-4">
                <Users className="h-6 w-6 lg:h-8 lg:w-8" />
                <div>
                  <Counter
                    tag="Players Joined"
                    totalCount={50}
                    totalDuration={20000}
                    extraString="+"
                  />
                </div>
              </div>
            </div>

            <div className="h-20 rounded-xl p-2 backdrop-blur lg:p-6">
              <div className="flex items-center gap-2 lg:gap-4">
                <Zap className="h-6 w-6 lg:h-8 lg:w-8" />
                <div>
                  <Counter
                    tag="Fast Response"
                    totalCount={300}
                    totalDuration={100}
                    extraString="ms"
                  />
                </div>
              </div>
            </div>
            <div className="h-20 rounded-xl p-2 backdrop-blur lg:p-6">
              <div className="flex items-center gap-2 lg:gap-4">
                <Gamepad2 className="h-6 w-6 lg:h-8 lg:w-8" />
                <div>
                  <Counter
                    tag="Played Games"
                    totalCount={500}
                    totalDuration={800}
                    extraString="+"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative backdrop-blur-sm">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold shadow-sm lg:mb-16 lg:text-4xl">
            Technologies Used
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <FeatureCard
              icon={<RiNextjsLine className="h-8 w-8 lg:h-12 lg:w-12" />}
              title="Frontend"
              description="Using Next.js and Tailwind CSS."
            />
            <FeatureCard
              icon={<Rss className="h-8 w-8 lg:h-12 lg:w-12" />}
              title="Real-Time Game"
              description="WebSockets for real-time updates"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 lg:h-12 lg:w-12" />}
              title="100% Secure"
              description="Play against opponents from around the world."
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-20 px-4 py-24">
        <div
          className="flex flex-col items-center gap-12 lg:flex-row"
          id="info"
        >
          <div className="lg:flex-1">
            <h2 className="mb-6 text-4xl font-bold">
              Learn Modern <br></br>Tic-Tac-Toe
            </h2>
            <p className="text-muted-foreground mb-8 pr-4 text-sm opacity-75 lg:pr-44 lg:text-lg">
              ✨ Welcome to the Advanced Tic-Tac-Toe 🔍 Game Rules:
              <br></br>
              <br></br>Players:2 (Player X and Player O) <br></br>🤺 Gameplay:
              Players take turns marking a spot on the 3x3 grid. Special Rule:
              After the 4th move, the first move made by either player is
              erased. <br></br>🎲. Winning: The first player to get 3 marks in a
              row (horizontally, vertically, or diagonally) wins! 🏆<br></br> ⚙️
              How it Works: The game keeps track of each player's moves in a
              circular queue (a fancy way of storing moves! 😉). Once the 4th
              move is made, the first move gets removed automatically. 🧹 The
              game checks for a winner after every move. If there is a winner,
              the game announces the winner and resets. 🔄
            </p>
            <Link
              href={`/dashboard`}
              className="flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-700 to-teal-700 px-8 py-1 text-lg opacity-85 lg:w-44"
            >
              Start Playing
            </Link>
          </div>

          <div className="relative flex min-h-[420px] min-w-[330px] rounded-md border border-neutral-800 shadow-2xl lg:min-h-[450px] lg:min-w-[420px]">
            <div className="rounded-xl p-8 shadow-2xl">
              <div className="grid h-full grid-cols-3 gap-4">
                <Image fill src={`/game.png`} alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative mt-1 border-t border-neutral-900 text-white lg:mt-20">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4"></div>
          <div className="relative text-center">
            <p className="">
              <Link
                href="https://github.com/iamasistiwari/advance-tictactoe"
                className="mr-2"
              >
                Github
              </Link>
              <Link href="https://x.com/iamasistiwari" className="mr-2">
                Twitter
              </Link>
              <Link
                href="https://www.linkedin.com/in/ashish-tiwari-0549552a9/"
                className=""
              >
                Linkedin
              </Link>
            </p>
            <p className="mt-2 text-neutral-500">
              © {new Date().getFullYear()} Realtime Modern Tic-Tac-Toe. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 backdrop-blur transition-colors">
      <div className="mb-4">{icon}</div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-sm opacity-75 lg:text-base">{description}</p>
      </div>
    </div>
  );
}
