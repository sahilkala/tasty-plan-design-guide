import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    cuisines: [] as string[],
    restrictions: [] as string[],
    goals: [] as string[]
  });
  const { toast } = useToast();
  const { updateUserPreferences } = useAuth();

  const steps = [
    "Welcome",
    "Cuisine Preferences", 
    "Dietary Restrictions",
    "Health Goals",
    "Complete"
  ];

  const cuisineOptions = [
    "Mediterranean", "Asian", "Italian", "Mexican",
    "Indian", "American", "Thai", "French",
    "Middle Eastern", "Japanese"
  ];

  const restrictionOptions = [
    "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free",
    "Nut-Free", "Low-Carb", "Keto", "Paleo"
  ];

  const goalOptions = [
    "Weight Loss", "Muscle Gain", "Heart Health",
    "Energy Boost", "Better Sleep", "General Wellness"
  ];

  const handleCuisineToggle = (cuisine: string) => {
    setPreferences(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine]
    }));
  };

  const handleRestrictionToggle = (restriction: string) => {
    setPreferences(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setPreferences(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const completeOnboarding = () => {
    // Save preferences to user context
    updateUserPreferences({
      dietaryRestrictions: preferences.restrictions,
      cuisines: preferences.cuisines,
      goals: preferences.goals,
      allergies: []
    });

    toast({
      title: "Profile created successfully!",
      description: "We're generating your first personalized meal plan.",
    });

    // Close the onboarding flow
    if (onComplete) {
      onComplete();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Smart Meal Planner</h2>
              <p className="text-lg text-gray-600">
                Let's personalize your meal planning experience in just a few steps
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-2">What you'll get:</h3>
              <ul className="text-left space-y-2 text-orange-800">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Personalized meal plans based on your tastes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Automatic grocery lists</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Nutritional tracking and goals</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What cuisines do you enjoy?</h2>
              <p className="text-gray-600">Select all that appeal to you</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cuisineOptions.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant={preferences.cuisines.includes(cuisine) ? "default" : "outline"}
                  className={`cursor-pointer p-3 text-center justify-center hover:scale-105 transition-transform ${
                    preferences.cuisines.includes(cuisine) 
                      ? "bg-orange-500 hover:bg-orange-600" 
                      : "hover:border-orange-300"
                  }`}
                  onClick={() => handleCuisineToggle(cuisine)}
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Any dietary restrictions?</h2>
              <p className="text-gray-600">We'll make sure your meals fit your needs</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {restrictionOptions.map((restriction) => (
                <Badge
                  key={restriction}
                  variant={preferences.restrictions.includes(restriction) ? "default" : "outline"}
                  className={`cursor-pointer p-3 text-center justify-center hover:scale-105 transition-transform ${
                    preferences.restrictions.includes(restriction) 
                      ? "bg-orange-500 hover:bg-orange-600" 
                      : "hover:border-orange-300"
                  }`}
                  onClick={() => handleRestrictionToggle(restriction)}
                >
                  {restriction}
                </Badge>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are your health goals?</h2>
              <p className="text-gray-600">We'll tailor nutrition recommendations for you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <Badge
                  key={goal}
                  variant={preferences.goals.includes(goal) ? "default" : "outline"}
                  className={`cursor-pointer p-4 text-center justify-center hover:scale-105 transition-transform ${
                    preferences.goals.includes(goal) 
                      ? "bg-orange-500 hover:bg-orange-600" 
                      : "hover:border-orange-300"
                  }`}
                  onClick={() => handleGoalToggle(goal)}
                >
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">You're all set!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your personalized meal planning experience is ready
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Your Preferences:</h3>
              <div className="space-y-3">
                {preferences.cuisines.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Cuisines: </span>
                    <span className="text-sm text-gray-600">{preferences.cuisines.join(", ")}</span>
                  </div>
                )}
                {preferences.restrictions.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Restrictions: </span>
                    <span className="text-sm text-gray-600">{preferences.restrictions.join(", ")}</span>
                  </div>
                )}
                {preferences.goals.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Goals: </span>
                    <span className="text-sm text-gray-600">{preferences.goals.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </CardTitle>
            <div className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {renderStepContent()}
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button 
              onClick={currentStep === steps.length - 1 ? completeOnboarding : nextStep}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
