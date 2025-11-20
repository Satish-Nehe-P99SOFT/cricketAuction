import News from "../components/News";
import Title from "../components/Title";

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-secondary via-slate-900 to-background-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Modern title section with gradient text */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-block">
              <Title title="Ipl" fadeAnimation="right" />
            </div>
            <div className="inline-block">
              <Title title="Auction" fadeAnimation="left" />
            </div>
            <p className="text-text-secondary text-lg md:text-xl mt-6 animate-fade-in">
              Experience the thrill of live cricket player auctions
            </p>
          </div>

          {/* News section with modern card design */}
          <div className="mt-12 md:mt-16">
            <News />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
