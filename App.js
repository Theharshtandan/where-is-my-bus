import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Settings } from "lucide-react";

export default function WhereIsMyBus() {
  const [busNumber, setBusNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    setSearchResults([
      { id: 1, number: "72", route: "Downtown to Central Park", eta: "5 mins" },
      { id: 2, number: "24A", route: "Uptown to Riverside", eta: "12 mins" },
    ]);
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(reg => console.log('Service worker registered:', reg))
        .catch(err => console.error('Service worker error:', err));
    }
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Where Is My Bus</h1>
        <Settings className="w-5 h-5" />
      </header>

      <div className="flex gap-2">
        <Input
          placeholder="Enter bus number or stop name"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <Card>
        <CardContent className="flex items-center gap-2 p-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="text-sm">Use current location</span>
        </CardContent>
      </Card>

      {searchResults.map((bus) => (
        <Card key={bus.id} className="bg-gray-100">
          <CardContent className="p-4 space-y-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Bus {bus.number}</p>
                <p className="text-sm text-gray-600">{bus.route}</p>
              </div>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-xs text-gray-500">ETA: {bus.eta}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
