'use client';

import Section from '@/components/Section/Section';
import { fetchNotesById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import Loader from '@/components/Loader/Loader';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNotesById(id),
    refetchOnMount: false,
  });
  if (isLoading) {
    return (
      <Section>
        <p className={css.mid}>Loading, please wait...</p>
      </Section>
    );
  }

  if (!note) {
    throw new Error('Note not found');
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
    </Section>
  );
};

export default NoteDetailsClient;
