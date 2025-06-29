
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Users, ChefHat, ShoppingCart, Heart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const { toast } = useToast();

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const mealPlans = [
    {
      id: 1,
      name: "Mediterranean Salmon Bowl",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      calories: 420,
      time: "25 min",
      servings: 2,
      tags: ["High Protein", "Heart Healthy"],
      description: "Fresh salmon with quinoa, cucumber, and tahini dressing"
    },
    {
      id: 2,
      name: "Thai Green Curry",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
      calories: 380,
      time: "30 min",
      servings: 4,
      tags: ["Vegan", "Spicy"],
      description: "Coconut curry with vegetables and jasmine rice"
    },
    {
      id: 3,
      name: "Italian Pasta Primavera",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
      calories: 350,
      time: "20 min",
      servings: 3,
      tags: ["Vegetarian", "Quick"],
      description: "Fresh pasta with seasonal vegetables and herbs"
    }
  ];

  const handleGeneratePlan = () => {
    toast({
      title: "Generating meal plan...",
      description: "Creating personalized meals based on your preferences",
    });
  };

  const handleAddToGrocery = (mealName: string) => {
    toast({
      title: "Added to grocery list",
      description: `Ingredients for ${mealName} have been added`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Meal Planner</h1>
                <p className="text-sm text-gray-600">Personalized nutrition made simple</p>
              </div>
            </div>
            <Button onClick={handleGeneratePlan} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Generate New Plan
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            <button className="py-4 px-2 border-b-2 border-orange-500 text-orange-600 font-medium">
              Meal Plans
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-700 font-medium">
              Grocery List
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-700 font-medium">
              History
            </button>
            <button className="py-4 px-2 text-gray-500 hover:text-gray-700 font-medium">
              Profile
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <CalendarDays className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-900">This Week's Meal Plan</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Previous</Button>
            <span className="px-4 py-2 text-sm font-medium bg-white rounded-md border">
              Week {currentWeek + 1}
            </span>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>

        {/* Today's Highlight */}
        <Card className="mb-8 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-orange-800">Today's Featured Meal</CardTitle>
                <CardDescription className="text-orange-600">
                  Ready in 25 minutes • Perfect for dinner
                </CardDescription>
              </div>
              <Star className="w-8 h-8 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={mealPlans[0].image} 
                  alt={mealPlans[0].name}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">{mealPlans[0].name}</h3>
                <p className="text-gray-600">{mealPlans[0].description}</p>
                <div className="flex flex-wrap gap-2">
                  {mealPlans[0].tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{mealPlans[0].calories}</span>
                    <span>calories</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{mealPlans[0].time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{mealPlans[0].servings} servings</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => handleAddToGrocery(mealPlans[0].name)}
                    variant="outline" 
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Grocery</span>
                  </Button>
                  <Button size="sm" className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>Save Recipe</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Meal Grid */}
        <div className="grid gap-6">
          <h3 className="text-xl font-semibold text-gray-900">Weekly Overview</h3>
          <div className="grid gap-4">
            {weekDays.map((day, dayIndex) => (
              <Card key={day} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-900">{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {mealPlans.slice(0, 3).map((meal, mealIndex) => (
                      <div key={meal.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg">
                          <img 
                            src={meal.image} 
                            alt={meal.name}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                        </div>
                        <div className="mt-2">
                          <h4 className="font-medium text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                            {meal.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{meal.calories} cal</span>
                            <span className="text-xs text-gray-500">{meal.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready for More?</h3>
            <p className="text-gray-300 mb-6">
              Unlock unlimited meal plans, grocery integration, and personalized recommendations
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" size="lg">
                Sign Up Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                View Premium Features
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Smart Meal Planner. Nutrition made simple and delicious.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
