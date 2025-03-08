"use client"

import ThreeScene from "@/components/three-scene"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("basics")
  const [rotationSpeed, setRotationSpeed] = useState(0.5)
  const [wireframe, setWireframe] = useState(true)
  const [geometry, setGeometry] = useState("icosahedron")
  const [lightColor, setLightColor] = useState("#0099ff")

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* 3D Scene */}
        <div className="w-full md:w-2/3 h-[50vh] md:h-screen">
          <ThreeScene rotationSpeed={rotationSpeed} wireframe={wireframe} geometry={geometry} lightColor={lightColor} />
        </div>

        {/* Controls */}
        <div className="w-full md:w-1/3 p-4 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Three.js Interactive Tutorial</CardTitle>
              <CardDescription>Learn Three.js by experimenting with different parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="basics">Basics</TabsTrigger>
                  <TabsTrigger value="geometry">Geometry</TabsTrigger>
                  <TabsTrigger value="lighting">Lighting</TabsTrigger>
                </TabsList>

                <TabsContent value="basics" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Rotation Speed</h3>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={rotationSpeed}
                      onChange={(e) => setRotationSpeed(Number.parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground mt-1">Value: {rotationSpeed}</div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Wireframe</h3>
                    <Button variant={wireframe ? "default" : "outline"} onClick={() => setWireframe(!wireframe)}>
                      {wireframe ? "Hide Wireframe" : "Show Wireframe"}
                    </Button>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">What's Happening?</h3>
                    <p className="text-sm">
                      The scene contains a 3D object that rotates. The rotation speed is controlled by the slider above.
                      The wireframe shows the underlying structure of the 3D model.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="geometry" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Geometry Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant={geometry === "box" ? "default" : "outline"} onClick={() => setGeometry("box")}>
                        Box
                      </Button>
                      <Button
                        variant={geometry === "sphere" ? "default" : "outline"}
                        onClick={() => setGeometry("sphere")}
                      >
                        Sphere
                      </Button>
                      <Button
                        variant={geometry === "icosahedron" ? "default" : "outline"}
                        onClick={() => setGeometry("icosahedron")}
                      >
                        Icosahedron
                      </Button>
                      <Button
                        variant={geometry === "torus" ? "default" : "outline"}
                        onClick={() => setGeometry("torus")}
                      >
                        Torus
                      </Button>
                    </div>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">About Geometries</h3>
                    <p className="text-sm">
                      Three.js provides many built-in geometry types. Each geometry is defined by vertices (points),
                      edges (lines), and faces (surfaces). The icosahedron in your original code is a 20-sided
                      polyhedron.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="lighting" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Light Color</h3>
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">About Lighting</h3>
                    <p className="text-sm">
                      Your original code uses a HemisphereLight, which provides ambient light from above and below. The
                      color you select affects the top hemisphere of the light. Lighting is crucial for creating
                      realistic 3D scenes and making objects visible.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

