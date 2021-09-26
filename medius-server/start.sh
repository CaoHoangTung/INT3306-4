while true ; do
    {
        python init_data.py && break
    } || {
        echo "Waiting for database connection..."
        sleep 10
    }
done

uvicorn main:app --host 0.0.0.0