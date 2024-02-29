"use client";
import clsx from "clsx";
import { handleToggleFavouriteExercise } from "@/server-actions/ExerciseServerActions";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import ExerciseInfoButton from "./ExerciseInfoButton";
import { Exercise } from "@prisma/client";
import ExerciseAddToRoutineButton from "./ExerciseAddToRoutineButton";
import ExerciseAddToRoutineCreatorButton from "./ExerciseAddToRoutineCreatorButton";
import ExerciseRemoveRoutineCreatorButton from "./ExerciseRemoveRoutineCreatorButton";

interface UserRoutine {
  id: string;
  name: string;
  exerciseCount: number;
}

type ExerciseProps = {
  exercises: Exercise[];
  favouriteExercises: Set<string>;
  userRoutines?: UserRoutine[];
  mode: string;
  highlightedExercises?: any;
};

export default function ExerciseTable({
  exercises,
  favouriteExercises,
  userRoutines,
  mode,
  highlightedExercises
}: ExerciseProps) {
  
  return (
    <Table
      aria-label="Exercises Table"
      className="mb-3 shadow-md"
      shadow="none"
      classNames={{ wrapper: "p-2 md:p-4" }}
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn className="hidden lg:table-cell">MUSCLES</TableColumn>
        <TableColumn><></></TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No results found."}>
        {exercises.map((exercise, index) => {
          const isHighlighted = highlightedExercises?.some((highlightedExercise: Exercise) => highlightedExercise.id === exercise.id);
          return (
            <TableRow key={exercise.id}>
              <TableCell className={clsx('capitalize', {
                'bg-zinc-700/20 text-primary': isHighlighted,
                'rounded-tl-lg': isHighlighted && index === 0
              })}>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: `/images/exercises/${exercise.image}/images/0.jpg`,
                  }}
                  description={
                    <span className="text-zinc-500">{exercise.category}</span>
                  }
                  name={exercise.name}
                />
              </TableCell>
              <TableCell className={clsx('capitalize hidden lg:table-cell', {
                'bg-zinc-700/20 text-primary': isHighlighted
              })}>
                <div className="flex flex-col">
                  <p className="text-bold text-small">
                    {exercise.primary_muscles.join(", ")}
                  </p>
                  <p className="text-bold text-tiny text-zinc-500">
                    {exercise.secondary_muscles.join(", ")}
                  </p>
                </div>
              </TableCell>
              <TableCell className={clsx('flex h-full justify-end items-center h-[61px]', {
                'bg-zinc-700/20 text-primary': isHighlighted,
                'rounded-tr-lg': isHighlighted && index === 0
              })}>
                <ButtonGroup size="sm" variant="flat">
                  <ExerciseInfoButton exercise={exercise} />
                  <Button
                    isIconOnly
                    onClick={() => handleToggleFavouriteExercise(exercise.id)}
                  >
                    {favouriteExercises.has(exercise.id) ? (
                      <IconStarFilled className="text-primary" size={20} />
                    ) : (
                      <IconStar className="hover:text-primary" size={20} />
                    )}
                  </Button>
                  {isHighlighted ? (
                    <ExerciseRemoveRoutineCreatorButton exerciseId={exercise.id} />
                  ) : (
                    mode === 'exercisePage' ? (
                      <ExerciseAddToRoutineButton
                        exercise={exercise}
                        userRoutines={userRoutines}
                      />
                    ) : (
                      mode === 'createRoutine' && <ExerciseAddToRoutineCreatorButton exerciseId={exercise.id} />
                    )
                  )}
                </ButtonGroup>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
