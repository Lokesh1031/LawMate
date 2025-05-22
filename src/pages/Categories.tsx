
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/lib/data";
import { Home, Briefcase, FileText, Users, Scale, Gavel, ClipboardList, Search, ArrowRight } from "lucide-react";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return <Home className="h-12 w-12" />;
    case "Briefcase":
      return <Briefcase className="h-12 w-12" />;
    case "FileText":
      return <FileText className="h-12 w-12" />;
    case "Users":
      return <Users className="h-12 w-12" />;
    case "Scale":
      return <Scale className="h-12 w-12" />;
    case "Gavel":
      return <Gavel className="h-12 w-12" />;
    case "ClipboardList":
      return <ClipboardList className="h-12 w-12" />;
    default:
      return <Search className="h-12 w-12" />;
  }
};

const Categories = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-lawmate mb-4">Legal Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our legal categories to find guidance tailored to your specific situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-lawmate-light rounded-full p-4 text-white mb-4">
                    {getIconComponent(category.icon)}
                  </div>
                  <CardTitle className="text-lawmate">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {category.guideIds.length} guides available
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <div className="text-lawmate flex items-center text-sm font-medium">
                    View Guides <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
