import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Users, ChefHat, ShoppingCart, Heart, Star, Table, User, LogOut, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import WeeklyPlanView from "@/components/WeeklyPlanView";
import MealPlanTable from "@/components/MealPlanTable";
import OnboardingFlow from "@/components/OnboardingFlow";
import { PlanGenerationFlow } from "@/components/PlanGenerationFlow";
import { AuthModal } from "@/components/AuthModal";
import { UserStateHandler } from "@/components/UserStateHandler";

const Index = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [activeTab, setActiveTab] = useState("meal-plans");
  const [viewMode, setViewMode] = useState("card");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPlanGeneration, setShowPlanGeneration] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  const { user, logout } = useAuth();

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
    if (!user) {
      setShowOnboarding(true);
    } else {
      setShowPlanGeneration(true);
    }
  };

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

  const nextWeek = () => setCurrentWeek(prev => prev + 1);
  const prevWeek = () => setCurrentWeek(prev => Math.max(0, prev - 1));

  const getUserStateDisplay = () => {
    if (!user) return "Visitor";
    if (!user.isSubscribed) return "Free User";
    return "Premium User";
  };

  const mockGroceryItems = [
    { id: 1, name: "Salmon fillet", category: "Protein", checked: false },
    { id: 2, name: "Quinoa", category: "Grains", checked: true },
    { id: 3, name: "Cucumber", category: "Vegetables", checked: false },
    { id: 4, name: "Coconut milk", category: "Pantry", checked: false },
    { id: 5, name: "Bell peppers", category: "Vegetables", checked: true },
  ];

  const mockMealHistory = [
    { id: 1, name: "Mediterranean Bowl", date: "2024-01-15", rating: 5 },
    { id: 2, name: "Thai Curry", date: "2024-01-10", rating: 4 },
    { id: 3, name: "Pasta Primavera", date: "2024-01-08", rating: 5 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "meal-plans":
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <CalendarDays className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Weekly Meal Plan</h2>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={prevWeek} 
                  variant="outline" 
                  size="sm"
                  disabled={currentWeek === 0}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm font-medium bg-white rounded-md border">
                  Week {currentWeek + 1}
                </span>
                <Button onClick={nextWeek} variant="outline" size="sm">
                  Next
                </Button>
                <Button
                  onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
                  variant="outline"
                  size="sm"
                  className="ml-4"
                >
                  <Table className="w-4 h-4 mr-2" />
                  {viewMode === "card" ? "Table View" : "Card View"}
                </Button>
              </div>
            </div>

            {viewMode === "card" ? (
              <>
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
                          <UserStateHandler requiredState="signed-up" feature="Grocery List">
                            <Button 
                              onClick={() => handleAddToGrocery(mealPlans[0].name)}
                              variant="outline" 
                              size="sm"
                              className="flex items-center space-x-1"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Add to Grocery</span>
                            </Button>
                          </UserStateHandler>
                          <UserStateHandler requiredState="signed-up" feature="Save Recipe">
                            <Button 
                              onClick={() => handleSaveRecipe(mealPlans[0].name)}
                              size="sm" 
                              className="flex items-center space-x-1"
                            >
                              <Heart className="w-4 h-4" />
                              <span>Save Recipe</span>
                            </Button>
                          </UserStateHandler>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <WeeklyPlanView />
              </>
            ) : (
              <UserStateHandler requiredState="signed-up" feature="Table View">
                <MealPlanTable mealPlans={mealPlans} weekDays={weekDays} />
              </UserStateHandler>
            )}
          </div>
        );
      case "grocery-list":
        return (
          <UserStateHandler requiredState="signed-up" feature="Grocery List">
            <Card>
              <CardHeader>
                <CardTitle>Grocery List</CardTitle>
                <CardDescription>Your shopping list for this week's meals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGroceryItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={item.checked}
                          className="rounded"
                        />
                        <div>
                          <p className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </UserStateHandler>
        );
      case "history":
        return (
          <UserStateHandler requiredState="signed-up" feature="Meal History">
            <Card>
              <CardHeader>
                <CardTitle>Meal History</CardTitle>
                <CardDescription>Your past meal plans and favorites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMealHistory.map((meal) => (
                    <div key={meal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{meal.name}</h4>
                        <p className="text-sm text-gray-500">{meal.date}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < meal.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </UserStateHandler>
        );
      case "profile":
        return (
          <UserStateHandler requiredState="signed-up" feature="Profile Settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile & Settings</CardTitle>
                <CardDescription>Manage your preferences and dietary requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Account Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {user?.name}</p>
                    <p><span className="font-medium">Email:</span> {user?.email}</p>
                    <p><span className="font-medium">Plan:</span> {user?.isSubscribed ? 'Premium' : 'Free'}</p>
                    <p><span className="font-medium">Member since:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>

                {user?.preferences && (
                  <div>
                    <h3 className="font-semibold mb-3">Dietary Preferences</h3>
                    <div className="space-y-3">
                      {user.preferences.cuisines && user.preferences.cuisines.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Favorite Cuisines:</p>
                          <div className="flex flex-wrap gap-1">
                            {user.preferences.cuisines.map((cuisine, index) => (
                              <Badge key={index} variant="secondary">{cuisine}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {user.preferences.dietaryRestrictions && user.preferences.dietaryRestrictions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Dietary Restrictions:</p>
                          <div className="flex flex-wrap gap-1">
                            {user.preferences.dietaryRestrictions.map((restriction, index) => (
                              <Badge key={index} variant="outline">{restriction}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {user.preferences.goals && user.preferences.goals.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Health Goals:</p>
                          <div className="flex flex-wrap gap-1">
                            {user.preferences.goals.map((goal, index) => (
                              <Badge key={index} className="bg-green-100 text-green-800">{goal}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => setShowOnboarding(true)}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Update Preferences</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </UserStateHandler>
        );
      default:
        return null;
    }
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
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{getUserStateDisplay()}</Badge>
                  <span className="text-sm text-gray-600">Hello, {user.name}</span>
                </div>
              )}
              <Button onClick={handleGeneratePlan} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                {user ? 'Generate New Plan' : 'Generate My Free Meal Plan'}
              </Button>
              {user ? (
                <Button onClick={logout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            <button 
              onClick={() => setActiveTab("meal-plans")}
              className={`py-4 px-2 border-b-2 font-medium ${
                activeTab === "meal-plans" 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Meal Plans
            </button>
            <button 
              onClick={() => setActiveTab("grocery-list")}
              className={`py-4 px-2 border-b-2 font-medium ${
                activeTab === "grocery-list" 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Grocery List
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`py-4 px-2 border-b-2 font-medium ${
                activeTab === "history" 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              History
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-2 border-b-2 font-medium ${
                activeTab === "profile" 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Profile
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderTabContent()}

        {/* CTA Section - only show on meal plans tab */}
        {activeTab === "meal-plans" && (
          <Card className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Ready for More?</h3>
              <p className="text-gray-300 mb-6">
                Unlock unlimited meal plans, grocery integration, and personalized recommendations
              </p>
              <div className="flex justify-center space-x-4">
                {!user ? (
                  <>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      onClick={() => setShowAuthModal(true)}
                    >
                      Sign Up Free
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-gray-900"
                      onClick={() => toast({ title: "Premium features", description: "Learn about premium features..." })}
                    >
                      View Premium Features
                    </Button>
                  </>
                ) : !user.isSubscribed ? (
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => toast({ title: "Premium features", description: "Learn about premium features..." })}
                  >
                    Upgrade to Premium
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Smart Meal Planner. Nutrition made simple and delicious.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      
      {showOnboarding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
          </div>
        </div>
      )}

      {showPlanGeneration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <PlanGenerationFlow onComplete={() => setShowPlanGeneration(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
