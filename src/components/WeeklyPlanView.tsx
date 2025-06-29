
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { MealCard } from "./MealCard";

const WeeklyPlanView = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const sampleMeals = [
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

  const nextWeek = () => setCurrentWeek(prev => prev + 1);
  const prevWeek = () => setCurrentWeek(prev => Math.max(0, prev - 1));

  return (
    <div className="space-y-6">
      {/* Week Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900">Weekly Meal Plan</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={prevWeek} 
            variant="outline" 
            size="sm"
            disabled={currentWeek === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="px-4 py-2 text-sm font-medium bg-orange-50 text-orange-800 rounded-md border">
            Week {currentWeek + 1}
          </span>
          <Button onClick={nextWeek} variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="grid gap-4">
        {weekDays.map((day, dayIndex) => (
          <Card key={day} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900 flex items-center justify-between">
                <span>{day}</span>
                <span className="text-sm font-normal text-gray-500">
                  {new Date(Date.now() + dayIndex * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Breakfast</h4>
                  <MealCard meal={sampleMeals[0]} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Lunch</h4>
                  <MealCard meal={sampleMeals[1]} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Dinner</h4>
                  <MealCard meal={sampleMeals[2]} featured={dayIndex === 0} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPlanView;
