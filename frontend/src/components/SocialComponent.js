import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Users } from 'lucide-react';
import styles from '../styles/SocialComponent.module.css';

const SocialComponent = ({ user }) => {
  return (
    <Card className={styles.socialCard}>
      <CardHeader>
        <CardTitle>Social</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <p>{user.following} Following</p>
          <p>{user.followers} Followers</p>
        </div>
        <Button className="w-full" variant="outline">
          <Users className="mr-2 h-4 w-4" /> Find Runners
        </Button>
      </CardContent>
    </Card>
  );
};

export default SocialComponent;