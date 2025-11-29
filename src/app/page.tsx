import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Puzzle, Calculator } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 p-8 flex flex-col items-center justify-center">
      <header className="mb-12 text-center">
        <h1 className="text-6xl font-black text-primary-blue mb-4 drop-shadow-sm">
          Kids Learn!
        </h1>
        <p className="text-2xl text-gray-600 font-medium">
          Choose a game to start playing
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Number Line Game Card */}
        <Link href="/math/number-line" className="group">
          <Card className="h-full hover:border-primary-blue transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-white/80 backdrop-blur">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-blue transition-colors">
                <Gamepad2 className="w-12 h-12 text-primary-blue group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-3xl text-primary-blue">Number Line</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-500 mb-6">
                Find the numbers and make the animals dance!
              </p>
              <Button variant="primary" size="lg" className="w-full">
                Play Now
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* Coming Soon: Math */}
        <Card className="h-full opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-12 h-12 text-secondary-green" />
            </div>
            <CardTitle className="text-3xl text-secondary-green">Math Fun</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-500 mb-6">
              Addition, Subtraction and more!
            </p>
            <Button variant="secondary" size="lg" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* Coming Soon: Logic */}
        <Card className="h-full opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Puzzle className="w-12 h-12 text-secondary-orange" />
            </div>
            <CardTitle className="text-3xl text-secondary-orange">Logic Maze</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-500 mb-6">
              Solve puzzles and find the way out!
            </p>
            <Button variant="secondary" size="lg" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
