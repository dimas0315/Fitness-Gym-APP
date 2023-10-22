import getExercises from '@/utils/getExercises';
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseList from './ExerciseList';

export const dynamic = 'force-static'

export default async function ExercisesPage() {
  const exercises = await getExercises()

  return (
    <>
    <PageHeading title="Exercises" />
    <ExerciseList exercises={exercises} />
  </>
  )
}
