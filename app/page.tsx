"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Car models with tank capacities in liters
const carModels = [
  { name: "Nissan Altima 2010 2.5L", capacity: 75.7 },
  { name: "Mazda Tribute 2002", capacity: 62.09 },
  { name: "Ford Ranger 2007", capacity: 64.4 },
  { name: "Toyota Echo 2000", capacity: 45.046 },
];

export default function GasTankCalculator() {
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [currentFuelLevel, setCurrentFuelLevel] = useState<number[]>([25]);
  const [pricePerLiter, setPricePerLiter] = useState<string>("1.50");

  const selectedCarData = carModels.find((car) => car.name === selectedCar);
  const tankCapacity = selectedCarData?.capacity || 0;
  const currentFuelPercentage = currentFuelLevel[0];
  const currentFuelAmount = (tankCapacity * currentFuelPercentage) / 100;
  const litersNeeded = tankCapacity - currentFuelAmount;
  const totalCost = litersNeeded * Number.parseFloat(pricePerLiter || "0");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gas Tank Fuel Calculator
          </h1>
          <p className="text-gray-600">
            Calculate how much you need to spend to fill up your tank
          </p>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">
              Fuel Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Car Selection */}
            <div className="space-y-2">
              <Label htmlFor="car-select" className="text-sm font-medium">
                Select Your Car Model
              </Label>
              <Select value={selectedCar} onValueChange={setSelectedCar}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your car model" />
                </SelectTrigger>
                <SelectContent>
                  {carModels.map((car) => (
                    <SelectItem key={car.name} value={car.name}>
                      {car.name} ({car.capacity}L)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCar && (
              <>
                <div className="space-y-4">
                  <Label className="text-sm font-medium">
                    Current Fuel Level: {currentFuelPercentage}%
                  </Label>

                  <div className="flex justify-center">
                    <div className="relative w-48 h-48">
                      {/* Background circle */}
                      <div className="absolute inset-0 rounded-full bg-gray-200">
                        {/* Fuel level circle */}
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-300"
                          style={{
                            clipPath: `inset(${
                              100 - currentFuelPercentage
                            }% 0 0 0)`,
                          }}
                        />
                        {/* Center circle with percentage */}
                        <div className="absolute inset-8 rounded-full bg-white shadow-inner flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">
                              {currentFuelPercentage}%
                            </div>
                            <div className="text-sm text-gray-600">
                              Fuel Level
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fuel Level Slider */}
                  <div className="px-2">
                    <Slider
                      value={currentFuelLevel}
                      onValueChange={setCurrentFuelLevel}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Empty</span>
                      <span>Full</span>
                    </div>
                  </div>
                </div>

                {/* Price Input */}
                <div className="space-y-2">
                  <Label htmlFor="price-input" className="text-sm font-medium">
                    Price per Liter ($)
                  </Label>
                  <Input
                    id="price-input"
                    type="number"
                    step="0.01"
                    min="0"
                    value={pricePerLiter}
                    onChange={(e) => setPricePerLiter(e.target.value)}
                    placeholder="Enter price per liter"
                    className="text-lg"
                  />
                </div>

                {/* Results */}
                {pricePerLiter && Number.parseFloat(pricePerLiter) > 0 && (
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Fill-up Calculation
                        </h3>
                        <div className="text-2xl font-bold text-green-700">
                          You need {litersNeeded.toFixed(1)}L, costing $
                          {totalCost.toFixed(2)} to fill your tank.
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                          <div className="bg-white/50 rounded-lg p-3">
                            <div className="font-medium">Liters Needed</div>
                            <div className="text-lg font-bold text-blue-600">
                              {litersNeeded.toFixed(1)}L
                            </div>
                          </div>
                          <div className="bg-white/50 rounded-lg p-3">
                            <div className="font-medium">Total Cost</div>
                            <div className="text-lg font-bold text-green-600">
                              ${totalCost.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Built with React & TailwindCSS • Ready for Vercel deployment
        </div>
      </div>
    </div>
  );
}
