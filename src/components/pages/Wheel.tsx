import WheelGame from "../wheel/WheelGame";
import PageTransition from "../ui/PageTransition";

const WheelPage = () => {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display text-primary-800 dark:text-primary-200">
            Spin the Wheel of Fun!
          </h2>
          <p className="text-primary-500 dark:text-primary-400">
            Let fate decide your next activity
          </p>
        </div>

        <WheelGame />
      </div>
    </PageTransition>
  );
};

export default WheelPage;
