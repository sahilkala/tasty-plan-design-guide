
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MealPlan {
  id: number;
  name: string;
  image: string;
  calories: number;
  time: string;
  servings: number;
  tags: string[];
  description: string;
}

interface MealPlanTableProps {
  mealPlans: MealPlan[];
  weekDays: string[];
}

const MealPlanTable = ({ mealPlans, weekDays }: MealPlanTableProps) => {
  const { toast } = useToast();

  const handleAddToGrocery = (mealName: string) => {
    toast({
      title: "Added to grocery list",
      description: `Ingredients for ${mealName} have been added`,
    });
  };

  const handleSaveRecipe = (mealName: string) => {
    toast({
      title: "Recipe saved",
      description: `${mealName} has been saved to your favorites`,
    });
  };

  // Generate meal data for the week
  const weekMeals = weekDays.map((day, dayIndex) => ({
    day,
    date: new Date(Date.now() + dayIndex * 24 * 60 * 60 * 1000).toLocaleDateString(),
    breakfast: mealPlans[0],
    lunch: mealPlans[1],
    dinner: mealPlans[2]
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Meal Plan - Table View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Day</TableHead>
                <TableHead>Breakfast</TableHead>
                <TableHead>Lunch</TableHead>
                <TableHead>Dinner</TableHead>
                <TableHead className="text-center">Daily Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weekMeals.map((dayMeal) => {
                const dailyCalories = dayMeal.breakfast.calories + dayMeal.lunch.calories + dayMeal.dinner.calories;
                
                return (
                  <TableRow key={dayMeal.day} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{dayMeal.day}</div>
                        <div className="text-xs text-gray-500">{dayMeal.date}</div>
                      </div>
                    </TableCell>
                    
                    {/* Breakfast */}
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={dayMeal.breakfast.image} 
                            alt={dayMeal.breakfast.name}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">
                              {dayMeal.breakfast.name}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {dayMeal.breakfast.description}
                            </p>
                            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                              <span>{dayMeal.breakfast.calories} cal</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{dayMeal.breakfast.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{dayMeal.breakfast.servings}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {dayMeal.breakfast.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex space-x-1 mt-2">
                              <Button 
                                onClick={() => handleAddToGrocery(dayMeal.breakfast.name)}
                                variant="outline" 
                                size="sm"
                                className="h-6 px-2 text-xs"
                              >
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                Add
                              </Button>
                              <Button 
                                onClick={() => handleSaveRecipe(dayMeal.breakfast.name)}
                                variant="outline" 
                                size="sm"
                                className="h-6 px-2 text-xs"
                              >
                                <Heart className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* Lunch */}
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={dayMeal.lunch.image} 
                            alt={dayMeal.lunch.name}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">
                              {dayMeal.lunch.name}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {dayMeal.lunch.description}
                            </p>
                            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                              <span>{dayMeal.lunch.calories} cal</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{dayMeal.lunch.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{dayMeal.lunch.servings}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {dayMeal.lunch.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex space-x-1 mt-2">
                              <Button 
                                onClick={() => handleAddToGrocery(dayMeal.lunch.name)}
                                variant="outline" 
                                size="sm"
                                className="h-6 px-2 text-xs"
                              >
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                Add
                              </Button>
                              <Button 
                                onClick={() => handleSaveRecipe(dayMeal.lunch.name)}
                                variant="outline" 
                                size="sm"
                                className="h-6 px-2 text-xs"
                              >
                                <Heart className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* Dinner */}
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={dayMeal.dinner.image} 
                            alt={dayMeal.dinner.name}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">
                              {dayMeal.dinner.name}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {dayMeal.dinner.description}
                            </p>
                            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                              <span>{dayMeal.dinner.calories} cal</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{dayMeal.dinner.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{dayMeal.dinner.servings}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {dayMeal.dinner.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex space-x-1 mt-2">
                              <Button 
                                onClick={() => handleAddToGrocery(dayMeal.dinner.name)}
                                variant="outline" 
                                size="sm"
                                className="h-6 px-2 text-xs"
                              >
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                Add
                              </Button>
                              <Button 
                                onClick={() => handleSaveRecipe(dayMeal.dinner.name)}
                                variant="outline" 
                                size="sm"
                                className="h-6 px-2 text-xs"
                              >
                                <Heart className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    {/* Daily Total */}
                    <TableCell className="text-center">
                      <div className="font-semibold text-lg">{dailyCalories}</div>
                      <div className="text-xs text-gray-500">calories</div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealPlanTable;
