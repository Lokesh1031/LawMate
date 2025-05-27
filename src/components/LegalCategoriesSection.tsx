
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Home, Briefcase, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const LegalCategoriesSection: React.FC = () => {
  const categories = [
    {
      id: "family",
      title: "Family Law",
      description: "Divorce, custody, adoption, and domestic relations",
      icon: Users,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=250&fit=crop",
      color: "assessment-theme"
    },
    {
      id: "housing",
      title: "Housing & Property",
      description: "Landlord-tenant disputes, property rights, and real estate",
      icon: Home,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=250&fit=crop",
      color: "templates-theme"
    },
    {
      id: "employment",
      title: "Employment Law",
      description: "Workplace rights, termination, and labor disputes",
      icon: Briefcase,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop",
      color: "guidance-theme"
    },
    {
      id: "contracts",
      title: "Contract Law",
      description: "Agreements, breaches, and business contracts",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=250&fit=crop",
      color: "assessment-theme"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Common Legal Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get expert guidance across the most common legal areas with AI-powered analysis
            and specific article and section references.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className={`hover:shadow-lg transition-all duration-300 border ${category.color}`}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <IconComponent className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/category/${category.id}`}>
                    <Button variant="outline" className="w-full group">
                      Explore Guides
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LegalCategoriesSection;
