import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from 'lucide-react';
import styles from '../styles/ProfileDetails.module.css';

const ProfileDetails = ({ user }) => {
  return (
    <Card className={styles.profileCard}>
      <CardContent className="flex items-center p-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-4 flex-grow">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
          <p className="text-sm">Joined {user.joinDate}</p>
        </div>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;