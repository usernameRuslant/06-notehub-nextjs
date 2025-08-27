'use client';

import Section from '@/components/Section/Section';
import { fetchNotesById } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import Loader from '@/components/Loader/Loader';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNotesById(id),
    refetchOnMount: false,
  });
  if (isLoading) {
    return (
      <Section>
        <p>Loading, please wait...</p>
      </Section>
    );
  }

  if (isError || !note) {
    return (
      <Section>
        <p>Something went wrong.</p>
      </Section>
    );
  }
  return (
    <Section>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </Section>
  );
};

export default NoteDetailsClient;
