"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { ChangeProblem, Problem } from "@/types/simplex"

interface ChangeFormProps {
  onSubmit: (changeProblem: ChangeProblem) => void
  problem: Problem
}

export function ChangeForm({ onSubmit, problem }: ChangeFormProps) {

  const [constraintRhs, setConstraintRhs] = useState<number[]>([0, 0, 0])

  const handleConstraintRhsChange = (index: number, value: string) => {
    const newRhs = [...constraintRhs]
    newRhs[index] = Number.parseFloat(value) || 0
    setConstraintRhs(newRhs)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ constraintNewRhs: constraintRhs })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Situação Atual dos Recursos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {problem.constraintRhs.map((value, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">{problem.constraintNames[i]}</p>
                <p className="text-lg font-mono">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">	Alterações Propostas nos Recursos</h3>
          <div className={`grid grid-cols-5 gap-2 items-end`}>
            {problem.constraintNames.map((row, i) => (
              <div key={`constraint-${i}`} className="space-y-2 p-4 border rounded-md">
                <div className="space-y-1">
                  <p className="text-sm">{row}</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`rhs-${i}`}>RHS</Label>
                  <Input
                    id={`rhs-${i}`}
                    type="number"
                    step="any"
                    value={constraintRhs[i]}
                    onChange={(e) => handleConstraintRhsChange(i, e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Recalcular
        </Button>
      </form>
    </>
  )
}
