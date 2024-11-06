import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from 'lucide-react';
import styles from '../styles/RunUp.module.css';

const RunUps = () => {
  const runUps = [
    { id: 1, name: "Morning Jog", date: "2024-11-10", participants: 5 },
    { id: 2, name: "Evening Sprint", date: "2024-11-12", participants: 3 },
    { id: 3, name: "Weekend Marathon", date: "2024-11-15", participants: 10 },
  ];

  return (
    <Card className={styles.runUpCard}>
      <CardHeader>
        <CardTitle>RunUps in Your Area</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          {runUps.map((runUps) => (
            <Card key={runUps.id} className="mb-2">
              <CardContent className="p-2">
                <h3 className="font-semibold">{runUps.name}</h3>
                <p className="text-sm text-muted-foreground">Date: {runUps.date}</p>
                <p className="text-sm text-muted-foreground">Participants: {runUps.participants}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
        <Button className="w-full mt-4">
          <Plus className="mr-2 h-4 w-4" /> Host RunUp
        </Button>
      </CardContent>
    </Card>
  );
};

export default RunUps;