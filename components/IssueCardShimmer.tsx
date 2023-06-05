import Card from "./Card";

const IssueCardShimmer = () => {
  return (
    <Card className="w-full py-8 px-6">
      <div className="animate-pulse space-y-4">
        <div className="h-2 bg-gray-300 rounded w-1/4"></div>
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-gray-300 h-3 w-3"></div>
          <div className="h-2 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="flex justify-between">
          <div className="h-2 bg-gray-300 rounded w-1/3"></div>
          <div className="h-2 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-2 bg-gray-300 rounded w-1/4"></div>
      </div>
    </Card>
  );
};

export default IssueCardShimmer;
