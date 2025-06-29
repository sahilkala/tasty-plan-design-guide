
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart, ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MealCardProps {
  meal: {
    id: number;
    name: string;
    image: string;
    calories: number;
    time: string;
    servings: number;
    tags: string[];
    description: string;
  };
  featured?: boolean;
}

export const MealCard = ({ meal, featured = false }: MealCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleAddToGrocery = () => {
    toast({
      title: "Added to grocery list",
      description: `Ingredients for ${meal.name} have been added`,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${meal.name} ${isLiked ? 'removed from' : 'added to'} your favorites`,
    });
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${featured ? 'border-2 border-orange-200' : ''}`}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={meal.image} 
            alt={meal.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-orange-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
            {meal.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {meal.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {meal.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">{meal.calories} cal</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{meal.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{meal.servings}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleAddToGrocery}
              variant="outline" 
              size="sm"
              className="flex-1 text-xs"
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Add to List
            </Button>
            <Button 
              onClick={handleLike}
              variant="outline" 
              size="sm"
              className={`px-3 ${isLiked ? 'text-red-600 border-red-200' : ''}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
