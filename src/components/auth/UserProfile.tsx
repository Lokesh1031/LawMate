
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  
  if (!user) return null;

  const userEmail = user.email || "";
  const userInitial = userEmail ? userEmail[0].toUpperCase() : "U";
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none flex items-center">
          <Avatar className="h-8 w-8 border-2 border-white cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarFallback className="bg-lawmate-light text-white">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span className="truncate">{userEmail}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="text-red-600 cursor-pointer flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
