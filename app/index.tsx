import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacing, typography, borderRadius } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const { colors, toggleTheme, isDark } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(1);

  const addTask = () => {
    // If there's text after trimming spaces, format a task object with
    // id, text, completed fields
    if (inputText.trim()) {
      const newTask: Task = {
        id: nextId,
        text: inputText.trim(),
        completed: false,
      };
      setTasks([newTask, ...tasks]); // add newTask, spread the other tasks into the state
      setInputText(''); // reset input text for the next task
      setNextId(nextId + 1); // start at 1 and then add 1 every time a task is created
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        // find task by id and toggle its completed property between true/false
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    // update task state with all tasks minus the selected one for deletion
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // useMemo here so that count is recalculated only when tasks change, not on every render
  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  // useMemo here so that styles are created on first render and not every render after
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity onPress={toggleTheme} style={{ marginLeft: 10 }}>
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        {completedCount} of {tasks.length} completed
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter a new task..."
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              style={[styles.task, item.completed && styles.completedTask]}
              onPress={() => toggleTask(item.id)}
            >
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

      {tasks.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No tasks yet!</Text>
          <Text style={styles.emptySubtext}>Add one above to get started</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      ...typography.title,
      color: colors.text,
    },
    subtitle: {
      ...typography.subtitle,
      color: colors.textSecondary,
      marginTop: spacing.xs,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    inputContainer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 2,
      ...typography.body,
      color: colors.text,
      marginRight: spacing.sm,
    },
    addButton: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.lg,
      justifyContent: 'center',
    },
    addButtonText: {
      color: colors.background,
      ...typography.button,
    },
    list: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    taskItem: {
      flexDirection: 'row',
      marginVertical: spacing.xs,
      alignItems: 'center',
    },
    task: {
      flex: 1,
      padding: spacing.md,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: borderRadius.sm,
      marginRight: spacing.sm,
    },
    completedTask: {
      backgroundColor: colors.backgroundSuccess,
    },
    taskText: {
      ...typography.body,
      color: colors.text,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: colors.textSecondary,
    },
    deleteButton: {
      backgroundColor: colors.danger,
      borderRadius: borderRadius.md,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText: {
      color: colors.background,
      fontSize: 18,
      fontWeight: 'bold',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 100,
    },
    emptyText: {
      fontSize: 18,
      color: colors.textMuted,
      marginBottom: spacing.xs,
    },
    emptySubtext: {
      ...typography.small,
      color: colors.textLight,
    },
  });
